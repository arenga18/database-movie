const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
	try {
		const inputKeywords = document.querySelector('.input-keyword');
		const movies = await getMovies(inputKeywords.value);
		updateUI(movies);
	} catch (error) {
		alertError(error);
	}
});

function getMovies(keyword) {
	return fetch('http://www.omdbapi.com/?apikey=88451b9f&s=' + keyword)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then((resJSON) => {
			if (resJSON.Error === 'Incorrect IMDb ID.') {
				throw new Error('Harap isi nama film!');
			} else if (resJSON.Response === 'False') {
				throw new Error(resJSON.Error);
			}
			return resJSON.Search;
		});
}

function updateUI(movies) {
	const movieContainer = document.querySelector('.movie-container');
	let cards = '';
	movies.forEach((m) => {
		cards += showCardMovies(m);
	});
	movieContainer.innerHTML = cards;
}

// Binding Items
document.addEventListener('click', async function (e) {
	if (e.target.classList.contains('modalDetailButton')) {
		try {
			const imdbid = e.target.dataset.imdbid;
			const detailMovies = await getDetailMovies(imdbid);
			updateUiDetail(detailMovies);
		} catch (error) {
			alertError(error);
		}
	}
});

function getDetailMovies(imdbid) {
	return fetch('http://www.omdbapi.com/?apikey=88451b9f&i=' + imdbid)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then((res) => res);
}

function updateUiDetail(m) {
	console.log(m);
	const movieDetail = showMovieDetail(m);
	const modalBody = document.querySelector('.modal-body');
	modalBody.innerHTML = movieDetail;
}

function alertError(err) {
	const alertContainer = document.querySelector('.alert-container');
	const alert = getAlert(err);
	alertContainer.innerHTML = alert;

	$('.alert')
		.delay(4000)
		.slideUp(200, function () {
			$(this).alert('close');
		});
}

function getAlert(err) {
	return `<div class="alert alert-danger" role="alert"> ${err}
        </div>`;
}

function showCardMovies(m) {
	return `<div class="col-md-4 my-5">
    <div
        class="card"
        style="width: 18rem">
        <img
            src="${m.Poster}"
            class="card-img-top"
            alt="..." />
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a
                href="#"
                class="btn btn-primary modalDetailButton" data-bs-toggle="modal"
                data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}"
                >Show Details</a
            >
        </div>
    </div>
</div>`;
}

function showMovieDetail(m) {
	return `<div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3"><img src="${m.Poster}" class="img-fluid alt=""></div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <h4>${m.Title}</h4>
                                </li>
                                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                                <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                                <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                                <li class="list-group-item">
                                    <strong>Plot</strong> <br />
                                    ${m.Plot}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;
}

// $('.search-button').on('click', function () {
// 	$.ajax({
// 		url:
// 			'http://www.omdbapi.com/?i=tt3896198&apikey=88451b9f&s=' +
// 			$('.input-keyword').val(),
// 		success: (res) => {
// 			const movies = res.Search;
// 			let card = ' ';
// 			movies.forEach((m) => {
// 				card += showCardMovies(m);
// 			});

// 			$('.movie-container').html(card);

// 			// Detail button
// 			$('.modalDetailButton').on('click', function () {
// 				$.ajax({
// 					url: 'http://www.omdbapi.com/?apikey=88451b9f&i=' + $(this).data('imdbid'),
// 					success: (m) => {
// 						const movieDetail = showMovieDetail(m);
// 						$('.modal-body').html(movieDetail);
// 					},
// 					error: (e) => {
// 						console.log('error', e);
// 					},
// 				});
// 			});
// 		},
// 		error: (e) => console.log(e.responseText),
// 	});
// });

// $.ajax({
// 	url: 'http://www.omdbapi.com/?i=tt3896198&apikey=88451b9f&s=avengers',
// 	success: (res) => {
// 		const movies = res.Search;
// 		let card = ' ';
// 		movies.forEach((m) => {
// 			card += showCardMovies(m);
// 		});

// 		$('.movie-container').html(card);

// 		// Detail button
// 		$('.modalDetailButton').on('click', function () {
// 			$.ajax({
// 				url: 'http://www.omdbapi.com/?apikey=88451b9f&i=' + $(this).data('imdbid'),
// 				success: (m) => {
// 					const movieDetail = showMovieDetail(m);
// 					$('.modal-body').html(movieDetail);
// 				},
// 				error: (e) => {
// 					console.log('error', e);
// 				},
// 			});
// 		});
// 	},
// 	error: (e) => console.log(e.responseText),
// });

// const SearchButton = document.querySelector('.search-button');

// SearchButton.addEventListener('click', async function () {
// 	try {
// 		const inputKeywords = document.querySelector('.input-keyword');
// 		const movies = await getMovies(inputKeywords.value);
// 		updateUI(movies);
// 	} catch (error) {
// 		alertError(error);
// 	}
// });

// function getMovies(keyword) {
// 	return fetch('http://www.omdbapi.com/?apikey=88451b9f&s=' + keyword)
// 		.then((res) => {
// 			if (!res.ok) {
// 				throw new Error(Response.statusText);
// 			}
// 			return res.json();
// 		})
// 		.then((res) => {
// 			if (res.Response === 'False') {
// 				throw new Error(res.Error);
// 			}
// 			return res.Search;
// 		});
// }

// function updateUI(movies) {
// 	let card = '';
// 	movies.forEach((m) => {
// 		card += showCardMovies(m);
// 	});
// 	const movieContainer = document.querySelector('.movie-container');
// 	movieContainer.innerHTML = card;
// }

// function alertError(err) {
// 	const alertContainer = document.querySelector('.alert-container');
// 	const alert = getAlert(err);
// 	alertContainer.innerHTML = alert;

// 	$('.alert')
// 		.delay(4000)
// 		.slideUp(200, function () {
// 			$(this).alert('close');
// 		});
// }

// function getAlert(msg) {
// 	return `<div class="alert alert-danger" role="alert"> ${msg}
//     </div>`;
// }

// // detailMovies
// // binding target
// document.addEventListener('click', function (e) {
// 	if (e.target.classList.contains('modalDetailButton')) {
// 		const imdbid = e.target.dataset.imdbid;
// 		const detailMovies = getDetailMovies(imdbid);
// 		updateUIDetail(detailMovies);
// 	}
// });

// function getDetailMovies(imdbid) {
// 	return fetch('http://www.omdbapi.com/?apikey=88451b9f&i=' + imdbid)
// 		.then((res) => res.json())
// 		.then((m) => m);
// }

// function updateUIDetail(m) {
// 	const movieDetail = showMovieDetail(m);
// 	const modalBody = document.querySelector('.modal-body');
// 	modalBody.innerHTML = movieDetail;
// }

// function getDetailMovies(imdbid) {
// 	fetch('http://www.omdbapi.com/?apikey=88451b9f&i=' + imdbid)
// 		.then((res) => res.json())
// 		.then((res) => {
// 			const movieDetail = showMovieDetail(res);
// 			const modalBody = document.querySelector('.modal-body');
// 			modalBody.innerHTML = movieDetail;
// 		});
// }

// function showCardMovies(m) {
// 	return `<div class="col-md-4 my-5">
//                 <div
//                     class="card"
//                     style="width: 18rem">
//                     <img
//                         src="${m.Poster}"
//                         class="card-img-top"
//                         alt="..." />
//                     <div class="card-body">
//                         <h5 class="card-title">${m.Title}</h5>
//                         <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
//                         <a
//                             href="#"
//                             class="btn btn-primary modalDetailButton" data-bs-toggle="modal"
//                             data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}"
//                             >Show Details</a
//                         >
//                     </div>
//                 </div>
//             </div>`;
// }

// function showMovieDetail(m) {
// 	return `<div class="container-fluid">
//                 <div class="row">
//                     <div class="col-md-3"><img src="${m.Poster}" class="img-fluid alt=""></div>
//                     <div class="col-md">
//                         <ul class="list-group">
//                             <li class="list-group-item">
//                                 <h4>${m.Title}</h4>
//                             </li>
//                             <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
//                             <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
//                             <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
//                             <li class="list-group-item">
//                                 <strong>Plot</strong> <br />
//                                 ${m.Plot}
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>`;
// }

// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
// 	const inputKeywords = document.querySelector('.input-keyword');
// 	fetch('http://www.omdbapi.com/?apikey=88451b9f&s=' + inputKeywords.value)
// 		.then((res) => res.json())
// 		.then((res) => {
// 			const movies = res.Search;
// 			let card = '';
// 			movies.forEach((m) => {
// 				card += showCardMovies(m);
// 			});
// 			const movieContainer = document.querySelector('.movie-container');
// 			movieContainer.innerHTML = card;
// 			const modalDetailButton = document.querySelectorAll('.modalDetailButton');
// 			modalDetailButton.forEach((btn) => {
// 				btn.addEventListener('click', function () {
// 					const imdbid = this.dataset.imdbid;
// 					console.log(imdbid);
// 					fetch('http://www.omdbapi.com/?apikey=88451b9f&i=' + imdbid)
// 						.then((res) => res.json())
// 						.then((res) => {
// 							const movieDetail = showMovieDetail(res);
// 							const modalBody = document.querySelector('.modal-body');
// 							modalBody.innerHTML = movieDetail;
// 						});
// 				});
// 			});
// 		});
// });

// let terpenuhi = false;
// const janji2 = new Promise((resolve, reject) => {
// 	if (terpenuhi) {
// 		setTimeout(() => {
// 			resolve('janji terpenuhi');
// 		}, 5000);
// 	} else {
// 		setTimeout(() => {
// 			reject('janji gagal');
// 		}, 5000);
// 	}
// });

// janji2
// 	.finally(() => console.log('Selesai menunggu'))
// 	.then((res) => console.log(res))
// 	.catch((res) => console.log(res));

// const film = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve([
// 			{
// 				Title: 'The Shawshank Redemption',
// 				Year: 2016,
// 				Author: 'arenga',
// 			},
// 		]);
// 	}, 1000);
// });

// const lagu = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve([
// 			{
// 				Title: '2002',
// 				Artis: 'shakira',
// 				year: 2016,
// 			},
// 		]);
// 	});
// });

// console.log(
// 	Promise.all([film, lagu]).then((res) => {
// 		const [film, lagu] = res;
// 		console.log(film);
// 		console.log(lagu);
// 	}),
// );
