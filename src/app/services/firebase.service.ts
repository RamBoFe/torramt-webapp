import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  AuthError,
  AuthErrorCodes,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  getFirestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { config } from '../../firebase.config';
import { UserFirestore } from '../models/user-firestore.model';

interface CollectionReferenceMap {
  users: CollectionReference<UserFirestore>;
}

const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
  toFirestore: (value: T) => value,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<T>,
    options?: SnapshotOptions
  ): T => snapshot.data(options),
});

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  private readonly getCollection: <T>(path: string) => CollectionReference<T>;

  collections: CollectionReferenceMap;

  constructor() {
    initializeApp(config);
    this.auth = getAuth();
    this.firestore = getFirestore();

    this.getCollection = <T>(path: string): CollectionReference<T> =>
      collection(this.firestore, path).withConverter(converter<T>());

    this.collections = { users: this.getCollection<UserFirestore>('users') };
  }

  /**
   * Signin with Firebase.
   */
  async signIn(): Promise<void> {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  /**
   * Refresh the id Token.
   *
   * @param callback
   */
  async refreshToken(callback: (user: User) => void): Promise<void> {
    onAuthStateChanged(this.auth, user => callback(user));
  }

  /**
   * Returns a UserCredential from the redirect-based sign-in flow.
   */
  async callbackSignIn() {
    return await getRedirectResult(this.auth);
  }

  /**
   * Returns a human-readable auth error message.
   *
   * @param authError
   */
  getHumanReadableAuthErrorMessage(authError: AuthError): string {
    let errorMessage: string;
    const authEmail = authError.customData.email;

    switch (authError.code) {
      case AuthErrorCodes.USER_DISABLED:
        errorMessage = `Le compte associé à l'email ${authEmail} est désactivé.`;
        break;

      case AuthErrorCodes.USER_DELETED:
        errorMessage = `Le compte associé à l'email ${authEmail} est supprimé.`;
        break;

      default:
        errorMessage = "Une erreur inattendue s'est produite.";
    }

    return errorMessage;
  }

  /**
   * Sign out the current user.
   */
  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  /**
   * Get a document data in a collection.
   *
   * @param collectionRef
   * @param docId
   */
  async getDoc<T>(
    collectionRef: CollectionReference<T>,
    docId: string
  ): Promise<T> {
    const docRef = doc(this.firestore, collectionRef.path, docId).withConverter(
      converter<T>()
    );

    return (await getDoc(docRef)).data();
  }
}
