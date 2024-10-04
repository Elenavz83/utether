
// const fs = require('fs')

export const RefreshLangs = async (lng)=>{
    let fa = global.db.collection("zlang-"+lng);
    let docs = await fa.find({}).project({_id:0}).toArray()
    global.langs[lng] = {} as any
    for(let doc of docs)
    {
        global.langs[lng][doc.k] = doc.v
    }
}

export default async () => {
    // let fs = require('fs')
    if (!global.langlist) {
        global.langs = {};
        global.langlist = []

        // global.langs["ar"] = require('../Langs/ar').default
        RefreshLangs("ar")
        global.langlist.push({code:"ar", name:'العربية', dir:"rtl" })

        // global.langs["de"] = require('../Langs/de').default
        RefreshLangs("de")
        global.langlist.push({code:"de", name:'deutsch', dir:"ltr" })

        // global.langs["en"] = require('../Langs/en').default
        RefreshLangs("en")
        global.langlist.push({code:"en", name:'english', dir:"ltr" })

        // global.langs["es"] = require('../Langs/es').default
        RefreshLangs("es")
        global.langlist.push({code:"es", name:'español', dir:"ltr"})

        // global.langs["fa"] = require('../Langs/fa').default
        RefreshLangs("fa")
        global.langlist.push({code:"fa", name:'فارسی', dir:"rtl" })

        // global.langs["fr"] = require('../Langs/fr').default
        RefreshLangs("fr")
        global.langlist.push({code:"fr", name:'français', dir:"ltr" })

        // global.langs["id"] = require('../Langs/id').default
        RefreshLangs("id")
        global.langlist.push({code:"id", name:'bahasa', dir:"ltr" })

        // global.langs["ja"] = require('../Langs/ja').default
        RefreshLangs("ja")
        global.langlist.push({code:"ja", name:'日本語', dir:"ltr"})

        // global.langs["ko"] = require('../Langs/ko').default
        RefreshLangs("ko")
        global.langlist.push({code:"ko", name:'한국어', dir:"ltr"})

        // global.langs["pt"] = require('../Langs/pt').default
        RefreshLangs("pt")
        global.langlist.push({code:"pt", name:'português', dir:"ltr"})

        // global.langs["ru"] = require('../Langs/ru').default
        RefreshLangs("ru")
        global.langlist.push({code:"ru", name:'русский', dir:"ltr"})

        // global.langs["ur"] = require('../Langs/ur').default
        RefreshLangs("ur")
        global.langlist.push({code:"ur", name:'اُردُو', dir:"rtl"})

        // global.langs["tr"] = require('../Langs/tr').default
        RefreshLangs("tr")
        global.langlist.push({code:"tr", name:'Türkçe', dir:"ltr" })

        // global.langs["zh"] = require('../Langs/zh').default
        RefreshLangs("zh")
        global.langlist.push({code:"zh", name:'中國人', dir:"ltr"})
        
    }
}
