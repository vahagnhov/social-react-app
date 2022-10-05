import './App.css';

const App = () => {
    return (
        <div>
            <Header/>
            <Technologies/>
        </div>
    );
}

const Header = () => {
    return (
        <div className="App">
            <ul>
                <li>Simple list 1</li>
                <li>Simple list 2</li>
                <li>Simple list 3</li>
            </ul>
        </div>
    );
}

const Technologies = () => {
    return (
        <div>
            <a href='#s'>Home</a>
            <a href='#s'>News</a>
            <a href='#s'>Messages</a>
        </div>
    );
}

export default App;
