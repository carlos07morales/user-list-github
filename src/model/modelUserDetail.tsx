export default interface UserDetailModel {
    login: string;
    avatar_url: string;
    name: string;
    company: string | null;
    location: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}