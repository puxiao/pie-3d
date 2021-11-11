import './App.css';
import Pie3D, { PieData } from '@/src/components/pie-3d';

const pieData: PieData = [
    {
        name: 'A',
        value: 15,
        color: 'red'
    },
    {
        name: 'B',
        value: 25,
        color: 'blue'
    },
    {
        name: 'C',
        value: 50,
        color: 'green'
    },
    {
        name: 'D',
        value: 35,
        color: 'yellow'
    }
]

function App() {
    return (
        <Pie3D data={pieData} />
    );
}

export default App;
