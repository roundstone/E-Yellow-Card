import IMAGES from "@/assets/images";

export interface UserDetails {
    passportNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    age: number;
    stateOfOrigin: string;
    yellowCardNumber: string;
    vaccinations: { name: string; expiresOn: string }[];
    imageUrl: string;
}

export const mockUser: UserDetails = {
    passportNumber: "A02737829",
    firstName: "Emmanuel",
    lastName: "Gambo",
    middleName: "John",
    age: 28,
    stateOfOrigin: "Nasarawa",
    yellowCardNumber: "A234568",
    vaccinations: [
        { name: "COVID-19", expiresOn: "2/10/2028" },
        { name: "Flu (influenza)", expiresOn: "2/10/2028" },
        { name: "Hepatitis A", expiresOn: "2/10/2028" },
        { name: "Hepatitis B", expiresOn: "2/10/2028" },
    ],
    imageUrl: IMAGES.jimPassport, // Replace with actual image URL
};