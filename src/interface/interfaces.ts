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

interface Create_Post{
    "Id": string,
    "OwnerId": string,
    "OwnerAvatarURL": string,
    "OwnerDisplayName": string,
    "OwnerProfileURL": string,
    "UpdateAt": Date,
    "Scope": Scopes,
    "Content": string,
    "Media": Array<string>,
    "NumOfComment": number,
    "CommentsURL": string,
    "NumOfLike": number,
    "LikesURL": string
}


///////////////////////////////////////////////COMMENTS INTERFACE RESPONSE/////////////////////////////////////////////////////////////////////////////////
interface CommentsItf {
    "Id": string,
    "PostId": string,
    "ParentId": string | null,
    "OwnerId": string,
    "IsHaveChild": boolean,
    "ChildCount": number,
    "ChildrenHref": string,
    "OwnerAvatarURL": string,
    "OwnerDisplayName": string,
    "OwnerProfileURL": string,
    "Content": string,
    "CommentCount": number,
    "ActionCount": number,
    "ActionUser": string | null,
    "CreateDate": Date
}

interface CreateComments {
        "Id": string,
        "PostId": string,
        "ParentId": string | null,
        "OwnerId": string,
        "Content": string,
        "CommentCount": number,
        "ActionCount": number,
        "ActionUser": string | null,
        "CreateDate": Date
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

interface Response_Get_Comments extends Response{
    "Data": {
        NumberOfElement: number,
        Paging:Array<CommentsItf> | null,
        NextPageURL:string,
        PreviousPageURL:string
    }
}
interface Response_Create_Post extends Response{
    "Data": Create_Post
}

interface Response_Create_Comments extends Response{
    "Data": CreateComments | null
}

export type {
    Response_Token_User,
    Response_Page_Next_Previous,
    Post,
    Page_Next_Previous,
    Response_Refresh_Token_User,
    User_Display,
    Token_User,
    Response_Get_Comments,
    CommentsItf,
    Response_Create_Post,
    Create_Post,
    Response_Create_Comments,
    CreateComments
}