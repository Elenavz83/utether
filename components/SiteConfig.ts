export default {
    URL: function(){
        if(typeof document != "undefined")
        {
            var link = document.createElement("a");
            link.href = "/";
            let st = link.href;
            st = st.substring(0, st.length - 1);
            return st
        }
        return "/"
    },

    sitefiles:"https://irmapserver.ir/userv",
    defaultFont:"Segoe UI, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    address:"https://1500.uservs.ir",
}
