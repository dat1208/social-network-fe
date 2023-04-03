import config from "../config/init";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Response_Signup } from "../../../interface/interfaces";
const redirect = (url: string, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);

async function signup(Username: string, DisplayName: string, Password: string, Email: string) {

    await config.with_default.post('/auth/signup', {
        Username: Username,
        Password: Password,
        Email: Email,
        Displayname: DisplayName
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(response => {
        const res = response.data as unknown as Response_Signup;
        console.log(res.Status);
        if (res.Status === 0) {
            Swal.fire({
                title: 'Signup Success',
                text: 'Welcome',
                icon: 'success',
                confirmButtonText: 'Login',
                didClose() {
                    redirect("/");
                },
            })
        }
        else {
            Swal.fire({
                title: 'Signup Error',
                text: res.Message,
                icon: 'error',
                confirmButtonText: 'Try Again',
            })
        }
    }).catch((err) => {
        window.location.reload();
    });
}

export default signup;