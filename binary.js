// This is used for getting user input.
import { createInterface } from "readline/promises";
import fs from'fs'

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";

const credentials = {
  accessKeyId: "", //Find  this in the AWS console under 'My security credentials or Linode
  secretAccessKey: "" //  Find this in the AWS console under 'My security or Linode
}

export async function main() {
  // A region and credentials can be declared explicitly. For example
  // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
  //initialize the client with those settings. However, the SDK will
  // use your local configuration and credentials if those properties
  // are not defined here.
  const s3Client = new S3Client({
    endpoint: "https://us-southeast-1.linodeobjects.com",
    region:  "us-southeast",
  });

  const params = {
      Bucket: 'Clone', // Name of the bucket
      Key: "my-first-object.txt", // Name of the object 
      Body: fs.createReadStream("my-first-object.txt"), //  The content of the object.
      ACL: "public-read", // To make the contect publicly available
  }
  const uploadObject = async(params) => {
    const results = await  s3Client.send(new PutObjectCommand(params));
    console.log("Successfully uploaded data to myBucket/myKey");
    return results;
  };
  const deleteObject = async(params) => {
    const results = await  s3Client.send(new DeleteObjectCommand(params));
    console.log("Successfully uploaded data to myBucket/myKey");
    return results;
  };
  }

  const listObject = async(params) => {
    const results = await  s3Client.send(new ListObjectsCommand(params));
   // console.log(results);
    for (let item of results){
      console.log("Link_of_the_document" + item.key)
    }
  };
  
  uploadObject(params)
  listObject(params)

//   // Create an Amazon S3 bucket. The epoch timestamp is appended
//   // to the name to make it unique.
//   const bucketName = `test-bucket-${Date.now()}`;
//   await s3Client.send(
//     new CreateBucketCommand({
//       Bucket: "Clone",
//     })
//   );

//   // Put an object into an Amazon S3 bucket.
//   await s3Client.send(
//     new PutObjectCommand({params})
//   );

//   await s3Client.send(
//     new ListObjectsCommand({params}),
//   );

//   // Read the object.
//   const { Body } = await s3Client.send(
//     new GetObjectCommand({params})
//   );

//   console.log(await Body.transformToString());

//   // Confirm resource deletion.
//   const prompt = createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const result = await prompt.question("Empty and delete bucket? (y/n) ");
//   prompt.close();

//   if (result === "y") {
//     // Create an async iterator over lists of objects in a bucket.
//     const paginator = paginateListObjectsV2(
//       { client: s3Client },
//       { Bucket: "Clone" }
//     );
//     for await (const page of paginator) {
//       const objects = page.Contents;
//       if (objects) {
//         // For every object in each page, delete it.
//         for (const object of objects) {
//           await s3Client.send(
//             new DeleteObjectCommand({params})
//           );
//         }
//       }
//     }

//     // Once all the objects are gone, the bucket can be deleted.
//     await s3Client.send(new DeleteBucketCommand({ params }));
//   }


// // Call a function if this file was run directly. This allows the file
// // to be runnable without running on import.
// import { fileURLToPath } from "url";
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   main();
// }
