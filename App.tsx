import { Image, StyleSheet, Button, View } from 'react-native';
import { Upload } from 'tus-js-client'

const host = ''

const mov = require('./assets/movie.mov')
const uri = Image.resolveAssetSource(mov).uri

async function upload() {
  var upload = new Upload({uri} as any, {
    endpoint: "http://" + host + ":1080/files/",
    chunkSize: 1024*1024,
    onError: function(error) {
        console.log("Failed because: " + error)
    },
    onProgress: function(bytesUploaded, bytesTotal) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
        console.log(bytesUploaded, bytesTotal, percentage + "%")
    },
    onSuccess: function() {
        console.log("Download %s from %s", upload.file, upload.url)
    }
  })
  upload.start()
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="upload" onPress={upload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
