

export const ServiceExpirationProjs = { timequota: 1, lockdate: 1, regdate: 1, extimequota: 1 }
export const ServiceExpirationFields = ["timequota", "lockdate", "regdate", "extimequota"]
export default (servitem) => {
    const env = process.env.NODE_ENV

    if (servitem.timequota == 0) {
        return { expiredate: new Date(0), expiretick: 0, expired: false }
    }
    var now = servitem.lockdate || new Date().getTime();
    var expdate = (servitem.lockdate ? (new Date().getTime() - servitem.lockdate) : 0) +
        servitem.regdate + (servitem.timequota + (servitem.extimequota || 0)) * 86400000;
    if (env == "development") {
        expdate -= (expdate % 10000)
    }
    return { expiredate: new Date(expdate), expiretick: expdate, expired: servitem ? (now - expdate > 0) : false }
}
