const baseURL = "http://localhost:5000";

const SignUpAPI = `${baseURL}/superadminsignup`;
const LoginAPI = `${baseURL}/superadminlogin`;
const LogoutAPI = `${baseURL}/superadminlogout`;
const LogoutAllAPI = `${baseURL}/superadminlogoutall`;

const ForgotPasswordAPI = `${baseURL}/adminforgotpassword`
const ChangePasswordAPI = `${baseURL}/adminchangepassword`

const HomeAPI = `${baseURL}/superadminhome`;
const MemberAPI = `${baseURL}/member`
const CreateMemberAPI = `${baseURL}/createmember`
const DeleteMemberAPI = `${baseURL}/deletemember`
const EditMemberAPI = `${baseURL}/editmember`

const UploadMembersAPI = `${baseURL}/uploadmembersdata`

const GetAdminsAPI = `${baseURL}/getadmins`
const GetGroupLeadersAPI = `${baseURL}/getgroupleaders`
const GetMembersAPI = `${baseURL}/getmembers`

const CreateEventAPI = `${baseURL}/createevent`

const UploadPhotosAPI = `${baseURL}/uploadphotos`
const GetPhotosAPI = `${baseURL}/getphotos`
const DeletePhotoAPI = `${baseURL}/removephoto`



module.exports = {
    SignUpAPI, 
    LoginAPI, 
    HomeAPI, 
    LogoutAPI, 
    LogoutAllAPI, 
    GetAdminsAPI, 
    GetGroupLeadersAPI, 
    GetMembersAPI, 
    MemberAPI, 
    DeleteMemberAPI, 
    CreateMemberAPI, 
    EditMemberAPI, 
    CreateEventAPI,
    ForgotPasswordAPI,
    ChangePasswordAPI,
    UploadMembersAPI,
    UploadPhotosAPI,
    GetPhotosAPI,
    DeletePhotoAPI
 }