
fileButton.addEventListener('change', function (e) {
    let storageRef = firebase.storage().ref()
    for (let i = 0; i < e.target.files.length; i++) {
        let imgFile = e.target.files[i];
        let imgRef = storageRef.child(`img/${imgFile.name}`)
        let task = imgRef.put(imgFile);

        task.on('state_changed', function process(snapshot) {
            let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(`${percent}%`);
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('PAUSED');
                    break;

                case firebase.storage.TaskState.RUNNING:
                    console.log('RUNNING');
                    break;
            }
        })
    }
})
