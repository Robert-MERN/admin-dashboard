const express = require("express");
const router = express.Router();
const { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc, deleteDoc } = require("firebase/firestore")
const { db } = require("../app/Firebase");


// get all data
router.post("/get", async(req, res) => {
    let data = []
    try {
        const docRef = collection(db, "passenger");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
            let uid = doc.id
            data.push({...doc.data(), uid });
        });
        await res.status(200).json({result: data, count: data.length});
    } catch (err) {
        res.status(401).json({ status: "internal error" });
    }
})

// add data
router.post("/add", async(req, res) => {
    try {
        const { uid, ...rest } = req.body
        await addDoc(collection(db, "passenger"), rest);
        await res.status(200).send("data inserted");
    } catch (err) {
        res.status(401).json({ status: "internal error" });
    }

})




// update data
router.post("/update", async(req, res) => {
    try {
        const washingtonRef = doc(db, "passenger", req.body.value.uid);
        await updateDoc(washingtonRef, req.body.value);
        await res.status(200).send("field has been updated");
    } catch (err) {
        res.status(401).json({ status: "internal error" });
    }

});

// delete data
router.post("/delete", async(req, res) => {
    console.log(req.body);
    try {
        await deleteDoc(doc(db, "passenger", req.body.key));
        await res.status(200).send("field has been deleted");
    } catch (err) {
        res.status(401).json({ status: "internal error" });
    }
});

//  delete data in batch

router.post("/delete/all", async(req, res) => {
    try {
        await Promise.all(req.body.deleted.map((item)=>{
         deleteDoc(doc(db, "passenger", item.uid))
        }));
        await res.status(200).json({result: req.body.deleted, count: req.body.deleted.length });
    } catch (err) {
        res.status(401).json({ status: "internal error" });
    }
});




module.exports = router;