export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const { profile } = state.firebase;
    const userId = state.firebase.auth.uid;

    firestore
      .collection('projects')
      .add({
        ...project,
        authorName: profile.name,
        authorSurname: profile.surname,
        authorId: userId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_PROJECT', project });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR', err });
      });
  };
};

export const updateProject = (newProject, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('projects')
      .doc(id)
      .update({
        ...newProject,
      })
      .then(() => {
        dispatch({ type: 'UPDATE_PROJECT', newProject });
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_PROJECT_ERROR', err });
      });
  };
};

export const deleteProject = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('projects')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_PROJECT_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'DELETE_PROJECT_ERROR', err });
      });
  };
};
