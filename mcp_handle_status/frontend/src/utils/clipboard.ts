/**
 * 剪贴板工具函数
 * 提供现代 navigator.clipboard API 和传统 execCommand 的降级方案
 */

export interface CopyResult {
    success: boolean;
    error?: string;
    method?: 'modern' | 'legacy' | 'manual';
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<CopyResult> 复制结果
 */
export async function copyToClipboard(text: string): Promise<CopyResult> {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return { success: true, method: 'modern' };
        } catch {
            return fallbackCopyToClipboard(text);
        }
    }
    return fallbackCopyToClipboard(text);
}

/**
 * 传统的复制方法（降级方案）
 * @param text 要复制的文本
 * @returns Promise<CopyResult> 复制结果
 */
function fallbackCopyToClipboard(text: string): Promise<CopyResult> {
    return new Promise((resolve) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        textArea.style.width = '1px';
        textArea.style.height = '1px';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';

        // 尝试将 textarea 插入到当前对话框内部（如果存在），以避免焦点陷阱阻止 focus
        let container: HTMLElement | null = null;
        const activeEl = document.activeElement as HTMLElement | null;
        if (activeEl) {
            const dialogEl = activeEl.closest('[role="dialog"]') as HTMLElement | null;
            if (dialogEl) {
                container = dialogEl;
            }
        }
        if (!container) {
            container = document.body;
        }
        container.appendChild(textArea);

        requestAnimationFrame(() => {
            let successful = false;
            let execError: any = null;

            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
            }

            try {
                textArea.focus({ preventScroll: true });
                textArea.select();

                // 使用现代方法尝试复制，如果失败则使用传统方法
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(text).then(() => {
                        textArea.remove();
                        resolve({ success: true, method: 'legacy' });
                    }).catch(() => {
                        // 如果现代方法也失败，尝试传统方法
                        try {
                            successful = document.execCommand('copy');
                        } catch (e) {
                            execError = e;
                        }
                        textArea.remove();

                        if (successful) {
                            resolve({ success: true, method: 'legacy' });
                        } else {
                            resolve({
                                success: false,
                                error: execError ? 'clipboard_not_supported' : 'execCommand_failed',
                                method: 'manual'
                            });
                        }
                    });
                } else {
                    // 直接使用传统方法
                    try {
                        successful = document.execCommand('copy');
                    } catch (e) {
                        execError = e;
                    }
                    textArea.remove();

                    if (successful) {
                        resolve({ success: true, method: 'legacy' });
                    } else {
                        resolve({
                            success: false,
                            error: execError ? 'clipboard_not_supported' : 'execCommand_failed',
                            method: 'manual'
                        });
                    }
                }
            } catch {
                textArea.remove();
                resolve({
                    success: false,
                    error: 'clipboard_not_supported',
                    method: 'manual'
                });
            }
        });
    });
}

/**
 * 检查剪贴板是否可用
 * @returns boolean 是否支持剪贴板操作
 */
export function isClipboardSupported(): boolean {
    // 优先检查现代 clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        return true;
    }

    // 检查是否支持 execCommand (虽然已过期，但仍可作为降级方案)
    try {
        return typeof document.execCommand === 'function';
    } catch {
        return false;
    }
}

/**
 * 获取剪贴板错误的用户友好提示
 * @param error 错误类型
 * @returns string 错误提示键
 */
export function getClipboardErrorMessage(error?: string): string {
    switch (error) {
        case 'execCommand_failed':
            return 'clipboardError.execCommandFailed';
        case 'clipboard_not_supported':
            return 'clipboardError.notSupported';
        default:
            return 'clipboardError.accessDenied';
    }
} 