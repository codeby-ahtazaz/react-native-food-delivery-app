import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.easy.rnfoodapp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "6979e88000237d72e7d2",
    userCollectionId: "user"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)  // Your Project ID
    .setPlatform(appwriteConfig.platform);   // Your package name / bundle identifier

export const account = new Account(client);
export const avatar = new Avatars(client);
export const database = new Databases(client);

// REGISTER ------------------------------------------------------------
export const register = async ({ email, password, name }: CreateUserPrams) => {
    try {
        const newAccount = await account.create({
            userId: ID.unique(),
            email,
            password,
            name
        });

        if (!newAccount) throw Error;

        await login({ email, password });

        const avatarURL = avatar.getInitialsURL(name)

        const result = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                name: name,
                email: email,
                accountId: newAccount.$id,
                avatar: avatarURL,
            }
        );

        
        return result;

    } catch (error) {
        console.log("Login Error:", error);
        throw new Error(error as string);
    }
}

// LOGIN ------------------------------------------------------------
export const login = async ({ email, password }: SignInParams) => {
    try {
        await account.createEmailPasswordSession({
            email,
            password
        });
    } catch (error) {
        throw new Error(error as string);
    }
}

// GET CURRENT USER ------------------------------------------------------------
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const users = await database.listDocuments({
            databaseId: appwriteConfig.databaseId,
            collectionId: appwriteConfig.userCollectionId,
            queries: [Query.equal('accountId', currentAccount.$id)],
        });

        if (!users) throw Error;

         return users.documents[0]; // return user object

    } catch (error) {
        throw new Error(error as string);
    }
}