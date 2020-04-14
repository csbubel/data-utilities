import React, { useState } from "react";
import { Button, Divider, Form, Grid, Header } from "semantic-ui-react";

const DataComparer = () => {
    const [colOne, setColA] = useState("");
    const [colTwo, setColB] = useState("");
    const [colOneUniques, setColOneUniques] = useState("");
    const [colTwoUniques, setColTwoUniques] = useState("");
    const [evaluated, setEvaluated] = useState(false);

    const normalizeColumns = (data) => data.split("\n").map(val => val.trim().toLowerCase());

    const evaluate = () => {
        const colOne_normalized = normalizeColumns(colOne);
        const colTwo_normalized = normalizeColumns(colTwo);

        const colOneSet = new Set(colOne_normalized);
        colTwo_normalized.forEach(val => colOneSet.delete(val));

        const colTwoSet = new Set(colTwo_normalized);
        colOne_normalized.forEach(val => colTwoSet.delete(val));

        setColOneUniques([...colOneSet].join("\n"));
        setColTwoUniques([...colTwoSet].join("\n"));
        setEvaluated(true);
    }

    return (
        <Form inverted>
            <Header inverted>Column Compare</Header>
            <Grid columns="2">
                <Grid.Row>
                    <Grid.Column>
                        <Form.TextArea label="Column A" value={colOne} onChange={e => setColA(e.target.value)} />
                    </Grid.Column>
                    <Grid.Column>
                        <Form.TextArea label="Column B" value={colTwo} onChange={e => setColB(e.target.value)} />
                    </Grid.Column>
                </Grid.Row>

                {evaluated &&
                    <Grid.Row>
                        <Grid.Column>
                            <Form.TextArea label="Column A Uniques" readonly value={colOneUniques} />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.TextArea label="Column B Uniques" readonly value={colTwoUniques} />
                        </Grid.Column>
                    </Grid.Row>
                }
            </Grid>

            <Divider />

            <Button primary onClick={evaluate}>Compare</Button>
        </Form>
    );
}

export default DataComparer;