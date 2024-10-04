export default (sentence:string):Array<any> => {
    if (!sentence) {
        return []
    }
    const regex = /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)+|\p{EPres}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})/gu
    const matches = sentence.match(regex)?.filter(x => x.length > 0) || [];
    let em1 = matches ? matches : [];
    const regex2 = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{1F92C}]/gu;
    const matches2 = sentence.match(regex2)?.filter(x => x.length > 0) || [];
    let em2 = matches2 ? matches2 : [];

    for (let x of em1) {
        if (!em2.includes(x)) {
            em2.push(x)
        }
    }
    let set = new Set(matches ? matches : [])
    return Array.from(set)
}