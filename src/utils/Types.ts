export type protectedRouteProps = {
    children: JSX.Element;
}

export type userDetailProps = {
    id: number;
    name: string | null;
    email: string;
    bio: string | null;
    phoneNumber: string | null;
    image: string | null;
}

export type updateUserProps = {
    name: string | null;
    bio: string | null;
    phoneNumber: string | null;
    image: string | null;
}

export type headerDataProps = {
    name: string | null;
    image: string | null;
}
