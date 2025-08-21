import { UUID } from "crypto"

export type Image = {
    id?: UUID,
    uri: string,
    host: "CLOUDINARY" | "S3"
}

export type AreaOfInterest = {
    id?: UUID,
    name: string
}

export type Sponsor = {
    id?: UUID,
    name: string
}

export type Event = {
    id?: UUID,
    title: string,
    description: string,
    eventType: 'COMPETITION' | 'FORMATION' | 'HACKATHON' | 'ORIENTATION',
    image: Image,
    areaOfInterests: Array<AreaOfInterest>,
    sponsors: Array<Sponsor>,
    sponsored: boolean,
    registrationOpen: boolean,
    registrationDeadline: Date,
    publishedAt: Date
}

export type News = {
    id?: UUID,
    title: string,
    description: string,
    image: Image,
    // TODO : @Ilyass change this later
    type: string, 
    publishedAt: Date
}

export type OfficeMember = {
    id?: string,
    image: Image,
    firstName: string,
    lastName: string,
    position: string,
    linkedin: string,
    instagram: string,
    addedAt: Date
}

/**
 * The major should be restricted in the front-end
 */
export type RegistrationRequest = {
    id?: UUID,
    firstName: string,
    lastName: string,
    email: string,
    year: number,
    areaOfInterests: Array<AreaOfInterest>,
    major: string
}

