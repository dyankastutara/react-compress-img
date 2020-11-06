import React from 'react';
import Compressor from 'compressorjs';

class CompressImage extends React.Component{
  constructor(){
    super();
    this.state = {
      image:{},
      result:null
    }
  }
  onChangeHandler = (event) => {
    const file = event.target.files[0]
    const self = this;
    if (!file) {
      return;
    }
    new Compressor(file, {
      minHeight:700,
      maxHeight:700,
      quality: 0.8,
      success(result) {
        const formData = new FormData();

        // The third parameter is required for server
        formData.append('file', result, result.name);

        // Send the compressed image file to server with XMLHttpRequest.
        // axios.post('/path/to/upload', formData).then(() => {
        //   console.log('Upload success');
        // });
        self.setState({result})
        console.log(result)
      },
      error(err) {
        console.log(err.message);
      },
    });
  }
  render(){
    return(
      <div>
        <div>Compress Image</div>
        <div><input type="file" name="file" onChange={this.onChangeHandler}/></div>
        <div>{JSON.stringify(this.state.image)}</div>
        <div>{JSON.stringify(this.state.result)}</div>
      </div>
    )
  }
}

export default CompressImage;
