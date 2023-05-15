
const getFilesRecursive=(path)=> {

    fs.readdir(path, (err, files) => {
            if(err) throw err;

            for (let file of files){

                if(file.includes('.wav')){
                    // this.encodeFile(path+'/'+file)
                }
                if(!file.includes('.')){
                    this.getFilesRecursive(path+'/'+file)
                }
            }
        }
    );
}
