import { describe, test, expect } from "vitest";
import { render, fireEvent } from '@testing-library/react';

import Snowman from './Snowman.jsx';

describe('Snowman component tests', function () {
    test('renders without crashing', function () {
        render(<Snowman />);
    });

    test('matches snapshot', function () {
        const { container } = render(<Snowman />);
        expect(container).toMatchSnapshot();
    });

    test('only allows 6 wrong guesses', function () {
        const { container } = render(<Snowman words={['test']}/>);

        const wrongLetterClasses = [".z", ".y", ".x", ".w", ".v", ".u"];
        wrongLetterClasses.forEach((letter) => {
            fireEvent.click(container.querySelector(letter));
        });

        expect(container.querySelector('.Snowman-buttonArea')).not.toBeInTheDocument();
        expect(container.querySelector('.Snowman-gameOverMsg')).toContainHTML('You lose. Correct word was test');
    });
});
