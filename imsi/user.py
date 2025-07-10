from firebase_admin import auth, firestore
from firebase_init import db

def get_user(uid):
    user = auth.get_user(uid)
    doc = db.collection('users').document(uid).get()
    return {
        'uid': user.uid,
        'email': user.email,
        'display_name': doc.get('display_name') if doc.exists else None
    }

def init_user_profile(uid, email, display_name):
    db.collection('users').document(uid).set({
        'email': email,
        'display_name': display_name,
        'created_at': firestore.SERVER_TIMESTAMP
    })