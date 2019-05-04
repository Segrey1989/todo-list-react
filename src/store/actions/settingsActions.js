export const installSettings = settings => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const userId = state.firebase.auth.uid;
    const currentSettings = state.firebase.profile.settings;

    firestore
      .collection('users')
      .doc(userId)
      .update({
        settings: { ...currentSettings, ...settings },
      })
      .then(() => {
        dispatch({ type: 'ADD_SETTINGS_SUCCESS', settings });
      })
      .catch(err => dispatch({ type: 'ADD_SETTINGS_ERROR', err }));
  };
};
