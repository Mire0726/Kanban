import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";

/**
 * dataURL形式でアップロード
 * @param dataURL
 * @param dir
 * @returns url
 */
export const uploadDataURL = async (dataURL: string, dir: string, docid: string, ext: string) => {
  try {
    if (dataURL.startsWith("data:")) {
      const storage = getStorage();
      const path = `admin/${dir}/${docid}.${ext}`;
      const storageRef = ref(storage, path);
      await uploadString(storageRef, dataURL, "data_url");
      const url = await getDownloadURL(ref(storage, path));
      return url;
    } else {
      throw new Error("dataURL形式ではありません");
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * file形式でアップロード
 * @param file
 * @param dir
 * @param ext
 * @param customMetadata
 * @returns url
 */
export const uploadFile = async (
  file: File,
  dir: string,
  docid: string,
  ext: string,
  customMetadata?: { [key: string]: string }
) => {
  try {
    const storage = getStorage();
    const path = `admin/${dir}/${docid}.${ext}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { customMetadata });
    const url = await getDownloadURL(ref(storage, path));
    return url;
  } catch (e) {
    console.error(e);
  }
};
