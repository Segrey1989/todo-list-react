export const signIn = user => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCES' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const doSignInWithFacebook = provider => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const auth = firebase.auth;
    const providers = {
      facebook: new auth.FacebookAuthProvider(),
      github: new auth.GithubAuthProvider(),
      google: new auth.GoogleAuthProvider(),
    };
    const currentProvider = providers[provider];
    auth()
      .signInWithPopup(currentProvider)
      .then(({ user }) => {
        const { uid } = user;
        let { displayName } = user;
        displayName = displayName.split(' ');
        const name = displayName[0];
        const surname = displayName[1];
        return firestore
          .collection('users')
          .doc(uid)
          .set({
            name,
            surname,
            initials: name[0] + surname[0],
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        return firebase.logout();
      })
      .then(() => {
        dispatch({ type: 'SIGNOUT' });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        return firestore
          .collection('users')
          .doc(response.user.uid)
          .set({
            name: newUser.name,
            surname: newUser.surname,
            initials:
              newUser.name[0].toUpperCase() + newUser.surname[0].toUpperCase(),
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};
