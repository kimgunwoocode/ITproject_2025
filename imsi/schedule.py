from firebase_init import db
from google.cloud.firestore import SERVER_TIMESTAMP

def add_schedule(uid, schedule):
    ref = db.collection('schedules').add({
        'uid': uid,
        **schedule,
        'created_at': SERVER_TIMESTAMP
    })
    return ref[1].id

def get_user_schedules(uid):
    docs = db.collection('schedules').where('uid', '==', uid).stream()
    return [doc.to_dict() for doc in docs]