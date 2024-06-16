function destroyTokens(res: any) {
    res.cookie('jwt', 'to be deleted', {maxAge: 1})
    res.cookie('refresh_token', 'to be deleted', {maxAge: 1})
}

export default destroyTokens