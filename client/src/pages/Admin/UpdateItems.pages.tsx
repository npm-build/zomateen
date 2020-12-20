import { useState, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const App: React.FC = () => {
	const accessToken = Cookies.get('accessToken');

	const [file, setFile] = useState<Blob>();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files![0]);
	};

	const validationSchema = yup.object({
		name: yup.string().required().max(10),
		foodId: yup.number().required().min(1),
		isAvailable: yup.boolean(),
		day: yup.string().required().max(10),
		tags: yup.array().of(yup.string().max(7))
	});

	return (
		<div>
			<Formik
				validateOnChange={true}
				initialValues={{
					name: '',
					foodId: '',
					price: '',
					isAvailable: false,
					day: '',
					img: '',
					tags: ['']
				}}
				validationSchema={validationSchema}
				onSubmit={async (data, { setSubmitting }) => {
					setSubmitting(true);

					if (!file) {
						return console.log('Upload Image');
					}

					const formData = new FormData();
					formData.append('filePath', file);
					formData.append('name', data.name);
					formData.append('foodId', data.foodId);
					formData.append('isAvailable', data.isAvailable.toString());
					formData.append('day', data.day);
					formData.append('price', data.price);
					formData.append('tags', JSON.stringify(data.tags));

					await axios
						.post('/api/food/add', formData, {
							headers: {
								'Content-Type': 'multipart/form-data',
								Authorization: 'Bearer ' + accessToken
							}
						})
						.then(res => {
							console.log(res);
						})
						.catch(e => {
							console.log(e);
						});

					setSubmitting(false);
				}}
			>
				{({ values, errors, isSubmitting }) => (
					<Form>
						<Field type='text' placeholder='food item name' name='name' />
						<Field type='number' placeholder='food id' name='foodId' />
						<Field type='number' placeholder='food price' name='price' />
						<Field name='isAvailable' type='checkbox' />
						<Field type='text' placeholder='food item of the day' name='day' />
						<input type='file' onChange={onChange} name='img' id='file' />

						<FieldArray name='tags'>
							{arrayHelpers => (
								<div>
									<button type='button' onClick={() => arrayHelpers.push('')}>
										add tag
									</button>
									{values.tags.map((tag, index) => {
										return (
											<div key={index}>
												<Field type='text' placeholder='tag' name={`tags.${index}`} />

												<button onClick={() => arrayHelpers.remove(index)}>x</button>
											</div>
										);
									})}
								</div>
							)}
						</FieldArray>

						<div>
							<button disabled={isSubmitting} type='submit'>
								submit
							</button>
						</div>
						<pre>{JSON.stringify(values, null, 2)}</pre>
						<pre>{JSON.stringify(errors, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default App;
