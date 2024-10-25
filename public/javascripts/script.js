async function deleteObject(id) {
  console.log(id);
  try {
    const response = await fetch(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({id}),
    });

    if (response) {
      window.location.reload(true);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
