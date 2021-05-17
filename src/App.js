import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextEditorContainer from './Components/text-editor-container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       React text editor
      </header>
      <TextEditorContainer></TextEditorContainer>
    </div>
  );
}

export default App;
