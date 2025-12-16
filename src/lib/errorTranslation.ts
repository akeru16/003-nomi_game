// Supabase error message translation to Japanese

export function translateSupabaseError(error: any): string {
    const errorMessage = error?.message || String(error);

    // Common Supabase auth errors
    const translations: Record<string, string> = {
        // Email/Password errors
        'Invalid login credentials': 'メールアドレスまたはパスワードが正しくありません',
        'Email not confirmed': 'メールアドレスが確認されていません。確認メールをご確認ください',
        'User not found': 'ユーザーが見つかりません',
        'Invalid email': 'メールアドレスの形式が正しくありません',
        'Password should be at least 6 characters': 'パスワードは6文字以上で入力してください',
        'User already registered': 'このメールアドレスは既に登録されています',
        'Email rate limit exceeded': 'メール送信の上限に達しました。しばらく時間をおいてから再度お試しください',
        'Signup requires a valid password': '有効なパスワードを入力してください',

        // Session errors
        'Session not found': 'セッションが見つかりません。再度ログインしてください',
        'Session expired': 'セッションの有効期限が切れました。再度ログインしてください',
        'Invalid session': 'セッションが無効です。再度ログインしてください',

        // Network errors
        'Failed to fetch': 'ネットワークエラーが発生しました。インターネット接続を確認してください',
        'Network request failed': 'ネットワークエラーが発生しました',

        // Database errors
        'duplicate key value violates unique constraint': 'このデータは既に登録されています',

        // Generic errors
        'Something went wrong': '予期しないエラーが発生しました。もう一度お試しください',
    };

    // Check for exact match
    for (const [englishMsg, japaneseMsg] of Object.entries(translations)) {
        if (errorMessage.includes(englishMsg)) {
            return japaneseMsg;
        }
    }

    // Check for partial matches
    if (errorMessage.toLowerCase().includes('password')) {
        return 'パスワードに問題があります。6文字以上で入力してください';
    }
    if (errorMessage.toLowerCase().includes('email')) {
        return 'メールアドレスに問題があります。正しい形式で入力してください';
    }
    if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch')) {
        return 'ネットワークエラーが発生しました。インターネット接続を確認してください';
    }
    if (errorMessage.toLowerCase().includes('timeout')) {
        return '接続がタイムアウトしました。もう一度お試しください';
    }

    // Default fallback
    return `エラーが発生しました: ${errorMessage}`;
}
