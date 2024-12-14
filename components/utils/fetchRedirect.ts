export const fetchRedirect = ()=>{
    let url;
    if (typeof window !== "undefined") {
        let redirectUrl = localStorage.getItem("redirect_url");
        if(redirectUrl){
            url = redirectUrl
        }
        else{
            url = "https://afruna.com"
        }
      }
      return url
}