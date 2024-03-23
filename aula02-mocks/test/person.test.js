import { describe, it, expect, jest, afterEach } from '@jest/globals';
import Person from '../src/person.js';

describe('#Person suite' , () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe('#validate', () => {
        it('should throw an error if name is not provided', () => {
            expect(() => Person.validate({cpf: "123.456.789-09"})).toThrow(new Error("Name is required"))
        })

        it('should throw an error if cpf is not provided', () => {
            expect(() => Person.validate({ name: "Eduardo" })).toThrow(new Error("CPF is required"))
        })

        it('should not throw an error if name and cpf are provided', () => {
            expect(() => Person.validate({ name: "Eduardo", cpf: "123.456.789-09" })).not.toThrow()
        })
    })

    describe('#format', () => {
        // parte do principio que os dados ja foram validados!

        it('should format the person name and CPF', () => {
            // AAA

            // Arrange
            const mockPerson = { name: "Eduardo Oliveira", cpf: "123.456.789-09" }
            // Act
            const result = Person.format(mockPerson)
            // Assert
            expect(result).toEqual({ name: "Eduardo", lastName: "Oliveira", cpf: "12345678909" })
        })
    })

    describe('#save', () => {
        it('should throw an error if person is invalid', () => {
            expect(() => Person.save({})).toThrow(new Error('Cannot save invalid person: {}'))
        })

        it('should not throw an error if person is valid', () => {
            expect(() => Person.save({ name: "Eduardo", lastName: "Oliveira", cpf: "12345678909" })).not.toThrow()
        })
    })

    describe('#proccess', () => {
        it('should return ok if person is valid', () => {
            const mockPerson = { name: "Eduardo Oliveira", cpf: "123.456.789-09" }
            jest.spyOn(Person, Person.validate.name).mockReturnValue()
            jest.spyOn(Person, Person.format.name).mockReturnValue({ name: "Eduardo", lastName: "Oliveira", cpf: "12345678909" })
            expect(Person.proccess(mockPerson)).toBe('ok')
        })

        it('should throw an error if person is invalid', () => {
            jest.spyOn(Person, Person.validate.name).mockImplementation(() => {
                throw new Error('Name is required')
            })
            expect(() => Person.proccess({})).toThrow(new Error('Name is required'))
        })
    })
})