import React from "react";
import "./SortingVisualizer.css";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMergeSortAnimations } from "../sortingAlgo/mergeSort.js";

const NUM_ARRAY_BARS = 185;

const PRIMARY_COLOR = "turquoise";

const SECONDARY_COLOR = "red";

const ANIMATION_SPEED_MS = 10;

export default class sortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUM_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }


  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  render() {
    const { array } = this.state;
    return (
      <Container>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand className="mr-auto" href="#">
            Sorting Visualiser
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="#GitRepo">GitHub Repo</Nav.Link>
          </Nav>
        </Navbar>
        <div className="container m-2">

        <Button
            variant="primary"
            className="m-3"
            id="resetButton"
            onClick={() => this.resetArray()}
          >
            Reset Array
          </Button>
          <Button
            type="button"
            onClick={() => this.mergeSort()}
            className="btn btn-primary m-3"
          >
            Merge Sort
          </Button>
          <Button type="button" onClick={() => this.testSortingAlgorithms()} className="btn btn-secondary m-3">
            Quick Sort
          </Button>
          <Button type="button" className="btn btn-success m-3">
            Bubble Sort
          </Button>
          <Button type="button" className="btn btn-danger m-3">
            Selection Sort
          </Button>
          <Button type="button" className="btn btn-warning m-3">
            Insertion Sort
          </Button>
        </div>
        <div className="container mr-auto array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
            ></div>
          ))}
          <br></br>
         
        </div>
      </Container>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }