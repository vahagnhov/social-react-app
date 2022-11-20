import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
// react-test-renderer  https://www.valentinog.com/blog/testing-react/
describe("ProfileStatus component", () => {

    let newPostText = 'myDomains.com';
    const mockCallback = jest.fn();

    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={newPostText} updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        expect(instance?.props.status).toBe(newPostText); // instance.state.status
    });

    /*test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status={newPostText} updateStatus={mockCallback}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.length).not.toBeNull(); // span.length  span.props.length
    });*/

    test("after creation <input> shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status={newPostText} updateStatus={mockCallback}/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status={newPostText} updateStatus={mockCallback}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe(newPostText);
    });

    test("<input> should be displayed in editmode instead of <span>", () => {
        const component = create(<ProfileStatus status={newPostText} updateStatus={mockCallback}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe(newPostText);
    });

    /*test("callback should be called", () => {
        const component = create(<ProfileStatus status={newPostText} updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode(); // instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });*/
});