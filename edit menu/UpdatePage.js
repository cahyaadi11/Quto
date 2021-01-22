import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Image,
} from 'react-native';

// firestore
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class UpdatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      nama: this.props.route.params.name,
      harga: this.props.route.params.harga,
      deskripsi: this.props.route.params.deskripsi,
      image: this.props.route.params.image,
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSumbit = () => {
    comsole.log('masuk');
    console.log(this.state);
  };

  // ini fungsi untuk menampilkan imagepicker (camera)
  chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      this.setState({filePath: response});
    });
  };

  UpdateData = () => {
    firestore()
      .collection('Users')
      .doc(this.state.id)
      .update({
        name: this.state.nama,
        harga: this.state.harga,
        deskripsi: this.state.deskripsi,
        image: this.state.image,
      })
      .then(() => {
        console.log('User updated!');
        this.props.navigation.navigate('Add Menu');
      });
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <Text>Nama: </Text>
        <TextInput
          placeholder="Masukkan nama"
          style={styles.textInput}
          onChangeText={(v) => this.onChangeText('nama', v)}
          value={this.state.nama}
          namaState="nama"
        />

        <Text>Harga: </Text>
        <TextInput
          placeholder="masukkan harga"
          style={styles.textInput}
          onChangeText={(v) => this.onChangeText('harga', v)}
          value={this.state.harga}
          namaState="harga"
        />

        <Text>Deskripsi: </Text>
        <TextInput
          placeholder="Masukkan deskripsi"
          style={styles.textInput}
          onChangeText={(v) => this.onChangeText('deskripsi', v)}
          value={this.state.deskripsi}
          namaState="deskripsi"
        />

        <Image
          source={{uri: this.state.image}}
          style={{width: 300, height: 200, marginTop: 20}}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => this.chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image (aku tak berdaya jul T_T)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tambah}
          onPress={() => this.UpdateData()}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Update Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  tambah: {
    backgroundColor: '#ff5000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default UpdatePage;
