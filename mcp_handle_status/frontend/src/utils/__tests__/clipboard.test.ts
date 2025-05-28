import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard, isClipboardSupported, getClipboardErrorMessage } from '../clipboard';

// Mock navigator.clipboard
const mockWriteText = vi.fn();
const mockClipboard = {
    writeText: mockWriteText
};

// Mock document.execCommand
const mockExecCommand = vi.fn();

describe('clipboard utils', () => {
    beforeEach(() => {
        // Reset mocks
        mockWriteText.mockReset();
        mockExecCommand.mockReset();

        // Mock document.execCommand
        Object.defineProperty(document, 'execCommand', {
            value: mockExecCommand,
            writable: true
        });

        // Mock document.queryCommandSupported
        Object.defineProperty(document, 'queryCommandSupported', {
            value: vi.fn().mockReturnValue(true),
            writable: true
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('copyToClipboard', () => {
        it('should use modern clipboard API when available', async () => {
            // Mock modern clipboard API
            Object.defineProperty(navigator, 'clipboard', {
                value: mockClipboard,
                writable: true
            });
            Object.defineProperty(window, 'isSecureContext', {
                value: true,
                writable: true
            });

            mockWriteText.mockResolvedValue(undefined);

            const result = await copyToClipboard('test text');

            expect(mockWriteText).toHaveBeenCalledWith('test text');
            expect(result).toEqual({
                success: true,
                method: 'modern'
            });
        });

        it('should fallback to legacy method when modern API fails', async () => {
            // Mock modern clipboard API that fails
            Object.defineProperty(navigator, 'clipboard', {
                value: mockClipboard,
                writable: true
            });
            Object.defineProperty(window, 'isSecureContext', {
                value: true,
                writable: true
            });

            mockWriteText.mockRejectedValue(new Error('Permission denied'));
            mockExecCommand.mockReturnValue(true);

            // Mock DOM methods
            const mockTextArea = {
                value: '',
                style: {},
                focus: vi.fn(),
                select: vi.fn()
            };
            const mockAppendChild = vi.fn();
            const mockRemoveChild = vi.fn();

            Object.defineProperty(document, 'createElement', {
                value: vi.fn().mockReturnValue(mockTextArea),
                writable: true
            });
            Object.defineProperty(document.body, 'appendChild', {
                value: mockAppendChild,
                writable: true
            });
            Object.defineProperty(document.body, 'removeChild', {
                value: mockRemoveChild,
                writable: true
            });

            const result = await copyToClipboard('test text');

            expect(mockWriteText).toHaveBeenCalledWith('test text');
            expect(mockExecCommand).toHaveBeenCalledWith('copy');
            expect(result).toEqual({
                success: true,
                method: 'legacy'
            });
        });

        it('should use legacy method when modern API is not available', async () => {
            // Mock no modern clipboard API
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                writable: true
            });

            mockExecCommand.mockReturnValue(true);

            // Mock DOM methods
            const mockTextArea = {
                value: '',
                style: {},
                focus: vi.fn(),
                select: vi.fn()
            };
            const mockAppendChild = vi.fn();
            const mockRemoveChild = vi.fn();

            Object.defineProperty(document, 'createElement', {
                value: vi.fn().mockReturnValue(mockTextArea),
                writable: true
            });
            Object.defineProperty(document.body, 'appendChild', {
                value: mockAppendChild,
                writable: true
            });
            Object.defineProperty(document.body, 'removeChild', {
                value: mockRemoveChild,
                writable: true
            });

            const result = await copyToClipboard('test text');

            expect(mockExecCommand).toHaveBeenCalledWith('copy');
            expect(result).toEqual({
                success: true,
                method: 'legacy'
            });
        });

        it('should return error when both methods fail', async () => {
            // Mock no modern clipboard API
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                writable: true
            });

            mockExecCommand.mockReturnValue(false);

            // Mock DOM methods
            const mockTextArea = {
                value: '',
                style: {},
                focus: vi.fn(),
                select: vi.fn()
            };
            const mockAppendChild = vi.fn();
            const mockRemoveChild = vi.fn();

            Object.defineProperty(document, 'createElement', {
                value: vi.fn().mockReturnValue(mockTextArea),
                writable: true
            });
            Object.defineProperty(document.body, 'appendChild', {
                value: mockAppendChild,
                writable: true
            });
            Object.defineProperty(document.body, 'removeChild', {
                value: mockRemoveChild,
                writable: true
            });

            const result = await copyToClipboard('test text');

            expect(result).toEqual({
                success: false,
                error: 'execCommand_failed',
                method: 'manual'
            });
        });
    });

    describe('isClipboardSupported', () => {
        it('should return true when modern clipboard API is available', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: mockClipboard,
                writable: true
            });
            Object.defineProperty(window, 'isSecureContext', {
                value: true,
                writable: true
            });

            expect(isClipboardSupported()).toBe(true);
        });

        it('should return true when legacy method is supported', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                writable: true
            });
            Object.defineProperty(window, 'isSecureContext', {
                value: false,
                writable: true
            });

            expect(isClipboardSupported()).toBe(true);
        });

        it('should return false when no clipboard support is available', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                writable: true
            });
            Object.defineProperty(window, 'isSecureContext', {
                value: false,
                writable: true
            });
            Object.defineProperty(document, 'queryCommandSupported', {
                value: vi.fn().mockReturnValue(false),
                writable: true
            });

            expect(isClipboardSupported()).toBe(false);
        });
    });

    describe('getClipboardErrorMessage', () => {
        it('should return correct error message for execCommand_failed', () => {
            expect(getClipboardErrorMessage('execCommand_failed')).toBe('clipboardError.execCommandFailed');
        });

        it('should return correct error message for clipboard_not_supported', () => {
            expect(getClipboardErrorMessage('clipboard_not_supported')).toBe('clipboardError.notSupported');
        });

        it('should return default error message for unknown error', () => {
            expect(getClipboardErrorMessage('unknown_error')).toBe('clipboardError.accessDenied');
            expect(getClipboardErrorMessage()).toBe('clipboardError.accessDenied');
        });
    });
}); 