import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Platform, ScrollView, Alert, PermissionsAndroid} from 'react-native'
 
import { connect } from 'react-redux';
import { addPost } from '../store/actions/posts';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
 
const noUser = 'Você precisa estar logado para adicionar um Post'
 
class AddPhoto extends Component {
    options = {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600
    };
    state = {
        image: null,
        comment: '',
    }
     
    /*requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };
    
       requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };*/
 
    captureImage = async () => {
        
        //let isCameraPermitted = await this.requestCameraPermission();
        //let isStoragePermitted = await this.requestExternalWritePermission();
        //if (isCameraPermitted && isStoragePermitted) {
            if(!this.props.name){
                Alert.alert('Falha!', noUser)
                return
            }

            launchCamera(this.options, (response) => {
                if (!response.didCancel) {
                    console.log(response)
                    this.setState({ image: {uri: response.assets[0].uri, base64: response.assets[0].data} })
                }
            });
        //}
    };
 
    pickImage = () => {
        if(!this.props.name){
            Alert.alert('Falha!', noUser)
            return
        }

        launchImageLibrary(this.options, (response) => {
            if (!response.didCancel) {
                this.setState({ image: {uri: response.assets[0].uri, base64: response.assets[0].data} })
            }
        });
    };
 
    save = async () => {
        if(!this.props.name){
            Alert.alert('Falha!', noUser)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        })

        this.setState({ image: null, comment: '' })
        this.props.navigation.navigate('Feed')
    }
 
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        { this.state.image !== null ? <Image source={{uri: this.state.image.uri }} style={styles.image} /> :null}                       
                    </View>
                    <TouchableOpacity onPress={this.pickImage}
                        style={styles.buttom}>
                        <Text style={styles.buttomText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.captureImage}
                        style={styles.buttom}>
                        <Text style={styles.buttomText}>Tire a foto agora</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Algum comentário para a foto?'
                        style={styles.input} value={this.state.comment}
                        editable={this.props.name ? true : false}
                        //editable={this.props.name != null}
                        onChangeText={comment => this.setState({ comment })} />
                    <TouchableOpacity onPress={this.save}
                        disabled={this.props.loading}
                        style={[styles.buttom, this.props.loading ? styles.buttonDisabled : null]}>
                        <Text style={styles.buttomText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
 
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)