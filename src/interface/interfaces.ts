//////////////////////////////////////////////////AUTH INTERFACE RESPONSE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Token{
    "AccessToken": string,
    "RefreshToken": string,
    "Exprise": number,
    "RefreshTokenURL": string
}

interface User_Display{
    "Id": string,
    "AvatarURL": string,
    "DisplayName": string,
    "UserProfileUrl": string
}


interface Token_User {
    "Token": Token,
    "User": User_Display
}
//////////////////////////////////////////////////POSTS INTERFACE RESPONSE////////////////////////////////////////////////
interface Page_Next_Previous{
    "Paging": Array<Post>,
    "NextPageURL": string,
    "PreviousPageURL": string
}

interface Post{
    Id: string,
    OwnerId: string,
    OwnerAvatarURL: string
    OwnerDisplayName: string,
    OwnerProfileURL: string,
    UpdateAt: Date,
    Scope: Scopes,
    Content :string,
    Media:Array<string>,
    NumOfComment: number,
    CommentsURL: string,
    NumOfLike: number,
    LikesURL: string
}

enum Scopes{
    public,
    private
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Response {
    "Id": string,
    "Timestamp": string,
    "ApiVersion":string,
    "Status": number,
    "Message": string,
}

interface Response_Token_User extends Response{
    "Data": Token_User
}

interface Response_Refresh_Token_User extends Response{
    "Data": Token
}

interface Response_Page_Next_Previous extends Response{
    "Data": Page_Next_Previous | null
}

export type {
    Response_Token_User,
    Response_Page_Next_Previous,
    Post,
    Page_Next_Previous,
    Response_Refresh_Token_User,
    User_Display,
    Token_User
}