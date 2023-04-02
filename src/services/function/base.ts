const redirect = (url :string, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);


  function formatDate(dateString: string): string {
    const date = new Date(Date.parse(dateString));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${year}`;
  }
  

  export default {redirect, formatDate}