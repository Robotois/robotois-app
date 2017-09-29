import { SubmissionError } from 'redux-form';

const submit = values => Promise.resolve()
  .then(() => {
    // console.log(values);
    const { task } = values;
    if (task && task.trim() !== '') {
      console.log('Tarea guardada exitosamente...');
    } else {
      throw new SubmissionError({
        task: 'El campo Tarea no puede estar vacío',
        _error: 'Error al guardar la Tarea',
      });
    }
  });

export default submit;
