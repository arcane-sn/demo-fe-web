
export async function copyToClipboard(
  text: string,
  onSuccess?: (type: string) => void,
  onError?: (error: Error) => void
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess?.('copied');
    
    // Auto-reset after 2 seconds
    setTimeout(() => {
      onSuccess?.('');
    }, 2000);
    
    return true;
  } catch (error) {
    onError?.(error as Error);
    return false;
  }
}

export async function copyToClipboardWithToast(
  text: string,
  toast: any,
  successMessage: string = 'Copied to clipboard!'
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
    return true;
  } catch (error) {
    toast.error('Failed to copy to clipboard');
    return false;
  }
}

export function isClipboardSupported(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}

export function fallbackCopyToClipboard(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    return false;
  }
}
