import { modifyElement } from './modifyElement';

describe('modifyElement({ elements, id, updatedFields })', () => {
  it('updates one field for a single element', () => {
    const data = [
      { id: 1, fieldA: 'Hey1', fieldB: 'Heyho1' },
      { id: 2, fieldA: 'Hey2', fieldB: 'Heyho2' },
      { id: 3, fieldA: 'Hey3', fieldB: 'Heyho3' }
    ];

    const result = modifyElement({
      elements: data,
      id: 2,
      updatedFields: { fieldA: 'Updated' }
    });

    const expected = [
      { id: 1, fieldA: 'Hey1', fieldB: 'Heyho1' },
      { id: 2, fieldA: 'Updated', fieldB: 'Heyho2' },
      { id: 3, fieldA: 'Hey3', fieldB: 'Heyho3' }
    ];

    expect(result).toEqual(expected);
  });

  it('updates multiple fields for a single element', () => {
    const data = [
      { id: 1, fieldA: 'Hey1', fieldB: 'Heyho1' },
      { id: 2, fieldA: 'Hey2', fieldB: 'Heyho2' },
      { id: 3, fieldA: 'Hey3', fieldB: 'Heyho3' }
    ];

    const result = modifyElement({
      elements: data,
      id: 2,
      updatedFields: { fieldA: 'Updated', fieldB: 'Updated' }
    });

    const expected = [
      { id: 1, fieldA: 'Hey1', fieldB: 'Heyho1' },
      { id: 2, fieldA: 'Updated', fieldB: 'Updated' },
      { id: 3, fieldA: 'Hey3', fieldB: 'Heyho3' }
    ];

    expect(result).toEqual(expected);
  });

  it('updates no fields when updatedFields is an empty object', () => {
    const data = [
      { id: 1, fieldA: 'Hey1', fieldB: 'Heyho1' },
      { id: 2, fieldA: 'Hey2', fieldB: 'Heyho2' },
      { id: 3, fieldA: 'Hey3', fieldB: 'Heyho3' }
    ];

    const result = modifyElement({
      elements: data,
      id: 2,
      updatedFields: {},
    });

    expect(result).toEqual(data);
  });

  it('returns the original array when the id was not found', () => {
    const data = [
      { id: 1, fieldA: 'Hey1', fieldB: 'Heyho1' },
      { id: 2, fieldA: 'Hey2', fieldB: 'Heyho2' },
      { id: 3, fieldA: 'Hey3', fieldB: 'Heyho3' }
    ];

    const result = modifyElement({
      elements: data,
      id: 5,
      updatedFields: { fieldA: 'Updated' },
    });

    expect(result).toEqual(data);
  });
});
