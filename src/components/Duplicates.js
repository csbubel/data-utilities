import React, { useState } from "react";
import { Button, Divider, Grid, Header, Form, Table } from "semantic-ui-react";

const Duplicates = () => {
    const [column, setColumn] = useState("");
    const [results, setResults] = useState([]);
    const [evaluated, setEvaluated] = useState(false);

    const normalize = (col) => {
        const normalizedToOriginal = new Map();
        const lines = col.split("\n");
        const normalizedLines = [];

        for (let line of lines) {
            const normalized = line.trim().toLowerCase();
            normalizedLines.push(normalized);

            if (!normalizedToOriginal.has(line)) {
                normalizedToOriginal.set(normalized, line);
            }
        }

        return [normalizedLines, normalizedToOriginal];
    }

    const evaluate = () => {
        const [lines, normalizedToOriginal] = normalize(column);
        const map = new Map();

        for (const line of lines) {
            const count = map.get(line) || 0;
            map.set(line, count + 1);
        }

        formatResult(map, normalizedToOriginal);
        setEvaluated(true);
    }

    const formatResult = (map, normalizedToOriginal) => {
        const results = [];

        for (const [line, count] of map) {
            if (count > 1) {
                results.push([normalizedToOriginal.get(line), count]);
            }
        }

        if (results.length > 0) {
            setResults(results);
        }
        else {
            setResults(["No duplicates found."]);
        }
    }

    return (
        <Form inverted>
            <Header inverted>Find Duplicates</Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form.TextArea rows="10" label="Column" value={column} onChange={e => setColumn(e.target.value)} />
                    </Grid.Column>
                </Grid.Row>

                {evaluated &&
                    <Grid.Row>
                        <Grid.Column>
                            <label>Duplicates</label>
                            {
                                results.length === 0
                                    ? <div>No duplicates found.</div>
                                    : <Table inverted>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Item</Table.HeaderCell>
                                                <Table.HeaderCell>Frequency</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {results.map(([item, count]) => <Table.Row>
                                                <Table.Cell>{item}</Table.Cell>
                                                <Table.Cell>{count}</Table.Cell>
                                            </Table.Row>)}
                                        </Table.Body>
                                    </Table>
                            }
                        </Grid.Column>
                    </Grid.Row>
                }
            </Grid>

            <Divider />

            <Button primary onClick={evaluate}>Evaluate</Button>
        </Form>
    );
};

export default Duplicates;