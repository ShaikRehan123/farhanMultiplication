import { Button, Input, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Home() {
  const [multiplicationNumbers, setMultiplicationNumbers] = useState<number[]>(
    []
  );
  const input = useRef<HTMLInputElement>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode == 112) {
      event.preventDefault();
      open();
      input.current?.focus();
    } else if (event.keyCode == 113) {
      event.preventDefault();
      close();
    } else if (event.keyCode == 114) {
      event.preventDefault();
      console.log(multiplicationNumbers);
    } else if (event.keyCode == 13) {
      event.preventDefault();
      // check if input is not 0 and valid
      // console.log(number);
      // if (number != 0) {
      //   setMultiplicationNumbers([...multiplicationNumbers, number]);
      //   setNumber(0);
      //   close();
      // }

      if (number.trim() === "") return;
      if (number.includes(",")) {
        const numbers = number.toString().split(",");
        const numbersInt = numbers.map((n: any) => parseInt(n));
        setMultiplicationNumbers([...multiplicationNumbers, ...numbersInt]);
        setNumber(0);
        close();
      } else {
        setMultiplicationNumbers([...multiplicationNumbers, parseInt(number)]);
        setNumber(0);
        close();
      }
    }
    console.log(event.keyCode);
  };
  const [type, setType] = useState<"straight" | "reverse">("straight");

  const [number, setNumber] = useState<any>(0);
  const [topTitle, setTopTitle] = useState<string>("Your Title");
  const [removeNumberIndex, setRemoveNumberIndex] = useState<number>(-1);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [multiplicationNumbers, number]);
  const printPDF = () => {
    const documentID = "main_pdf_content";
    const input = document.getElementById(documentID);
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save(`${topTitle}.pdf`);
      });
    }

    const documentID2 = "main_pdf_content_without_answers";
    const input2 = document.getElementById(documentID2);
    if (input2) {
      input2?.style.removeProperty("display");

      html2canvas(input2).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save(`${topTitle} Without Answers.pdf`);
      });
      input2.style.setProperty("display", "none");
    }
  };
  return (
    <div className="min-h-screen p-10">
      <Modal opened={opened} onClose={close} title="New Number">
        <Input
          placeholder="Number"
          onChange={(event) => {
            console.log(event.target.value);
            setNumber(event.target.value);
          }}
          value={number}
          ref={input}
          id="number_input"
        />
      </Modal>
      <h1 className="text-4xl font-bold text-center">
        Multiplications Numbers
      </h1>
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Title"
          onChange={(event) => {
            setTopTitle(event.target.value);
          }}
          value={topTitle}
          className="flex-1"
        />
        <Select
          data={[
            { label: "Straight", value: "straight" },
            { label: "Reverse", value: "reverse" },
          ]}
          value={type}
          onChange={setType as any}
        />
      </div>
      <hr className="my-4 bg-gray-300" />
      <div className="grid grid-cols-4 gap-2 p-5" id="main_pdf_content">
        <h2 className="text-2xl font-bold text-center col-span-4">
          {topTitle}
        </h2>

        {multiplicationNumbers.map((number, i) => (
          <div
            className="bg-white py-2    border border-gray-900 border-solid rounded-md"
            key={i}
          >
            {type === "straight" ? (
              <>
                {[...Array(10).keys()].map((i) => (
                  <>
                    <div
                      key={i}
                      className="flex flex-row justify-between  p-1  items-center  rounded-md font-bold "
                    >
                      <span className="flex-1">{number}</span>
                      <span className="flex-1">x</span>
                      <span className="flex-1">{i + 1}</span>
                      <span className="flex-1"> = </span>
                      <span className="flex-1">{number * (i + 1)}</span>
                    </div>
                    {i !== 9 && <div className="h-[1px] bg-gray-300"></div>}
                  </>
                ))}
              </>
            ) : (
              <>
                {[...Array(10).keys()].reverse().map((i) => (
                  <>
                    <div
                      key={i}
                      className="flex flex-row justify-between  p-1  items-center  rounded-md font-bold "
                    >
                      <span className="flex-1">{number}</span>
                      <span className="flex-1">x</span>
                      <span className="flex-1">{i + 1}</span>
                      <span className="flex-1"> = </span>
                      <span className="flex-1">{number * (i + 1)}</span>
                    </div>
                    {i !== 9 && <div className="h-[1px] bg-gray-300"></div>}
                  </>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <hr className="my-4 bg-gray-300" />
      <div
        className="grid grid-cols-4 gap-2 p-5"
        id="main_pdf_content_without_answers"
      >
        <div className="flex flex-row justify-between w-full col-span-4">
          <h2 className="text-2xl font-bold text-center col-span-4">
            Name: {"      "}
          </h2>
          <h2 className="text-2xl font-bold text-center col-span-4">
            {topTitle}
          </h2>
          <h2 className="text-2xl font-bold text-center col-span-4">
            Level:
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </h2>
        </div>

        {multiplicationNumbers.map((number, i) => (
          <div
            className="bg-white py-2    border border-gray-900 border-solid rounded-md"
            key={i}
          >
            {/* {[...Array(10).keys()].map((i) => (
              <>
                <div
                  key={i}
                  className="flex flex-row justify-between  p-1  items-center  rounded-md font-bold "
                >
                  <span className="flex-1">{number}</span>
                  <span className="flex-1">x</span>
                  <span className="flex-1">{i + 1}</span>
                  <span className="flex-1"> = </span>
                  <span className="flex-1"></span>
                </div>
                {i !== 9 && <div className="h-[1px] bg-gray-300"></div>}
              </>
            ))} */}

            {type === "straight" ? (
              <>
                {[...Array(10).keys()].map((i) => (
                  <>
                    <div
                      key={i}
                      className="flex flex-row justify-between  p-1  items-center  rounded-md font-bold "
                    >
                      <span className="flex-1">{number}</span>
                      <span className="flex-1">x</span>
                      <span className="flex-1">{i + 1}</span>
                      <span className="flex-1"> = </span>
                      <span className="flex-1"></span>
                    </div>
                    {i !== 9 && <div className="h-[1px] bg-gray-300"></div>}
                  </>
                ))}
              </>
            ) : (
              <>
                {[...Array(10).keys()].reverse().map((i) => (
                  <>
                    <div
                      key={i}
                      className="flex flex-row justify-between  p-1  items-center  rounded-md font-bold "
                    >
                      <span className="flex-1">{number}</span>
                      <span className="flex-1">x</span>
                      <span className="flex-1">{i + 1}</span>
                      <span className="flex-1"> = </span>
                      <span className="flex-1"></span>
                    </div>
                    {i !== 9 && <div className="h-[1px] bg-gray-300"></div>}
                  </>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 justify-center mt-4">
        <Button onClick={open}>Add Number</Button>
        <Button onClick={printPDF} color="green">
          Print PDF
        </Button>
        <Input
          placeholder="Remove Number"
          onChange={(event) => {
            if (/^\d+$/.test(event.target.value)) {
              setRemoveNumberIndex(parseInt(event.target.value));
            }
          }}
          value={removeNumberIndex}
        />
        <Button
          onClick={() => {
            if (
              removeNumberIndex >= 0 &&
              removeNumberIndex < multiplicationNumbers.length
            ) {
              const newMultiplicationNumbers = [...multiplicationNumbers];
              newMultiplicationNumbers.splice(removeNumberIndex, 1);
              setMultiplicationNumbers(newMultiplicationNumbers);
            }
          }}
          color="red"
        >
          Remove Number
        </Button>
      </div>
    </div>
  );
}

export default Home;
