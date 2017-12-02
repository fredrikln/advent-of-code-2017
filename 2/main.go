package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func one() {
	file, _ := os.Open("input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	sum := 0

	for scanner.Scan() {
		min := 9999
		max := -9999
		diff := 0
		for _, number := range strings.Split(scanner.Text(), "\t") {
			num, _ := strconv.Atoi(number)

			if num < min {
				min = num
			}

			if num > max {
				max = num
			}
		}
		diff = max - min

		sum = sum + diff
	}

	fmt.Println(sum)
}

func two() {
	file, _ := os.Open("input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	sum := 0

	for scanner.Scan() {
		for _, number1 := range strings.Split(scanner.Text(), "\t") {
			num1, _ := strconv.ParseFloat(number1, 64)

			for _, number2 := range strings.Split(scanner.Text(), "\t") {
				num2, _ := strconv.ParseFloat(number2, 64)

				if num2 > num1 {
					continue
				}

				floatDivision := num1 / num2
				intval := int(floatDivision)

				diff := floatDivision - float64(intval)

				if diff == 0 && intval != 1 {
					sum += intval
				}
			}

		}

	}

	fmt.Println(sum)
}

func main() {
	one()
	two()
}
