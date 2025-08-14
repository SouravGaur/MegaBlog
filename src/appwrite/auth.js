import confi from "../confi/confi";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client(); //.setProject("<PROJECT_ID>");  Your project ID
  account;
  constructor() {
    this.client
      .setEndpoint(confi.appwriteUrl)
      .setProject(confi.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        console.log("//call another method");
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const emailPasswordSession =
        await this.account.createEmailPasswordSession(email, password);
      if (!emailPasswordSession) {
        console.log("email daal de");
      } else {
        return emailPasswordSession;
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUSer() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
