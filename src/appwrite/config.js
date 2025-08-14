import confi from "../confi/confi";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  datbases;
  storage;
  constructor() {
    this.client
      .setEndpoint(confi.appwriteUrl)
      .setProject(confi.appwriteProjectId);

    this.datbases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.datbases.createDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("error in databaseCreation ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.datbases.updateDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("there us error in updation of document", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.datbases.deleteDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("there is error in deleting tje post", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.datbases.getDocument(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(":there is error in getting the post ", error);
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.datbases.listDocuments(
        confi.appwriteDatabaseId,
        confi.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("error in fetching the posts", error);
      return false;
    }
  }
  //file upload services
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        confi.appwriteBucketId,
        ID.unique,
        file
      );
    } catch (error) {
      console.log("there is error in uploading file ", error);
      return false;
    }
  }
  async deleteFile(fileID) {
    try {
      return await this.storage.deleteFile(confi.appwriteBucketId, fileID);
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(confi.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
